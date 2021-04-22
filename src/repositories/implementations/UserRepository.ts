import { getRepository } from 'typeorm';
import { UserEntity } from '../../entities/UserEntity';
import User from '../../database/models/User';
import { IUserRepository } from '../IUserRepository';

export class UserRepository implements IUserRepository {
  constructor() {
    this.selectAsync = this.selectAsync.bind(this);
    this.insertAsync = this.insertAsync.bind(this);
  }

  async updateAsync(user: UserEntity): Promise<UserEntity> {
    const repository = getRepository(User);
    await repository.update(user.id, {
      name: user.name,
      email: user.email,
    });
    const updatedUser = await repository.findOne(user.id);
    return new UserEntity(updatedUser);
  }

  async selectCompleteAsync(email: string): Promise<UserEntity> {
    const usersRepository = getRepository(User);
    const user = await usersRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.favorites', 'favorites')
      .leftJoinAndSelect('favorites.expert', 'favoriteExpert')
      .leftJoinAndSelect('favoriteExpert.avatar', 'favoriteExpertAvatar')
      .leftJoinAndSelect('users.testimonials', 'testimonials')
      .leftJoinAndSelect('users.appointments', 'appointments')
      .leftJoinAndSelect('appointments.expert', 'appointmentsExpert')
      .leftJoinAndSelect('appointmentsExpert.avatar', 'appointmentExpertAvatar')
      .leftJoinAndSelect('appointments.service', 'services')
      .leftJoinAndSelect('users.avatar', 'avatar')
      .where('users.email = :email', { email })
      .getOne();

    return new UserEntity(user);
  }

  async selectByIdAsync(id: string): Promise<UserEntity> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ id });
    if (!user) return null;
    return new UserEntity(user);
  }

  async selectAsync(email: string): Promise<UserEntity> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ email });
    if (!user) return null;
    return new UserEntity(user);
  }

  async insertAsync(user: UserEntity): Promise<UserEntity> {
    const usersRepository = getRepository(User);
    const newUser = usersRepository.create(user);
    await usersRepository.save(newUser);
    return new UserEntity(newUser);
  }
}
