import { getRepository } from 'typeorm';
import Expert from '../../database/models/Expert';
import { ExpertEntity } from '../../entities/ExpertEntity';
import { IExpertRepository } from '../IExpertRepository';

export class ExpertRepository implements IExpertRepository {
  async updateAsync(expert: ExpertEntity): Promise<ExpertEntity> {
    const expertRepository = getRepository(Expert);
    await expertRepository.update(expert.id, expert);
    const expertUpdated = await this.selectByIdAsync(expert.id);
    return new ExpertEntity(expertUpdated);
  }

  async selectCompleteAsync(id: string): Promise<ExpertEntity> {
    const expertRepository = getRepository(Expert);
    const expert = await expertRepository
      .createQueryBuilder('experts')
      .leftJoinAndSelect('experts.services', 'services')
      .leftJoinAndSelect('experts.thumbnails', 'thumbnails')
      .leftJoinAndSelect('experts.avatar', 'avatar')
      .where('experts.id = :id', { id })
      .getOne();
    if (!expert) return null;
    return new ExpertEntity(expert);
  }

  async selectByIdAsync(id: string): Promise<ExpertEntity> {
    const expertRepository = getRepository(Expert);
    const expert = await expertRepository.findOne({ id });
    if (!expert) return null;
    return new ExpertEntity(expert);
  }

  async selectByLocationAsync(location: string): Promise<ExpertEntity[]> {
    const expertRepository = getRepository(Expert);
    const experts = await expertRepository
      .createQueryBuilder('experts')
      .leftJoinAndSelect('experts.avatar', 'avatar')
      .where('experts.location = :location', { location })
      .getMany();
    if (experts.length > 0) {
      const expertList = experts.map((expert) => new ExpertEntity(expert));
      return expertList;
    }
    return [];
  }

  async selectAllAsync(): Promise<ExpertEntity[]> {
    const expertRepository = getRepository(Expert);
    const experts = await expertRepository
      .createQueryBuilder('experts')
      .leftJoinAndSelect('experts.avatar', 'avatar')
      .getMany();
    if (experts.length > 0) {
      const expertList = experts.map((expert) => new ExpertEntity(expert));
      return expertList;
    }
    return [];
  }

  async selectAsync(email: string): Promise<ExpertEntity> {
    const expertRepository = getRepository(Expert);
    const expert = await expertRepository.findOne({ email });
    if (!expert) return null;
    return new ExpertEntity(expert);
  }

  async insertAsync(expert: ExpertEntity): Promise<ExpertEntity> {
    const expertRepository = getRepository(Expert);
    const newExpert = expertRepository.create(expert);
    await expertRepository.save(newExpert);
    return new ExpertEntity(newExpert);
  }
}
