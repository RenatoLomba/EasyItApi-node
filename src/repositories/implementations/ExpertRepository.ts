import { getRepository } from 'typeorm';
import Expert from '../../database/models/Expert';
import { ExpertEntity } from '../../entities/ExpertEntity';
import { IExpertRepository } from '../IExpertRepository';

export class ExpertRepository implements IExpertRepository {
  async updateAsync(expert: ExpertEntity): Promise<ExpertEntity> {
    const expertRepository = getRepository(Expert);
    const actualExpert = await expertRepository.findOne({ id: expert.id });
    actualExpert.name = expert.name;
    actualExpert.email = expert.email;
    actualExpert.location = expert.location;
    actualExpert.password = expert.password;
    actualExpert.stars = expert.stars;
    await expertRepository.save(actualExpert);
    return new ExpertEntity(actualExpert);
  }

  async selectCompleteAsync(id: string): Promise<ExpertEntity> {
    const expertRepository = getRepository(Expert);
    const expert = await expertRepository.findOne({ id }, { relations: ['services'] });
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
    const experts = await expertRepository.find({ where: { location } });
    if (experts.length > 0) {
      const expertList = experts.map((expert) => new ExpertEntity(expert));
      return expertList;
    }
    return [];
  }

  async selectAllAsync(): Promise<ExpertEntity[]> {
    const expertRepository = getRepository(Expert);
    const experts = await expertRepository.find();
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
