import { getRepository } from 'typeorm';
import Expert from '../../database/models/Expert';
import ExpertEntity from '../../entities/ExpertEntity';
import { IExpertRepository } from '../IExpertRepository';

export default class ExpertRepository implements IExpertRepository {
  constructor() {
    this.selectAsync = this.selectAsync.bind(this);
    this.insertAsync = this.insertAsync.bind(this);
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
