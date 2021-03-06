import { hash } from 'bcrypt';
import { DefaultError } from '../../adapters/errors/DefaultError';
import { ExpertEntity } from '../../entities/ExpertEntity';
import { IExpertRepository } from '../../repositories/IExpertRepository';
import { ICreateExpertDTO } from '../dtos/ICreateExpertDTO';
import { ICreateExpertUseCase } from '../ICreateExpertUseCase';

export class CreateExpertUseCase implements ICreateExpertUseCase {
  constructor(
    private expertRepository: IExpertRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(expert: ICreateExpertDTO): Promise<ExpertEntity> {
    const expertAlreadyExists = await this.expertRepository.selectAsync(expert.email);

    if (expertAlreadyExists) {
      throw new DefaultError('Expert already exists');
    }

    const newExpert = new ExpertEntity(expert);
    newExpert.password = await hash(newExpert.password, 8);

    const expertCreated = await this.expertRepository.insertAsync(newExpert);

    return expertCreated;
  }
}
