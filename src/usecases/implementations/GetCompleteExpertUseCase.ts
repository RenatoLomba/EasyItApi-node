import { DefaultError } from '../../adapters/errors/DefaultError';
import { ExpertEntity } from '../../entities/ExpertEntity';
import { IExpertRepository } from '../../repositories/IExpertRepository';
import { IGetCompleteExpertUseCase } from '../IGetCompleteExpertUseCase';

export class GetCompleteExpertUseCase implements IGetCompleteExpertUseCase {
  constructor(
    private expertRepository: IExpertRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(id: string): Promise<ExpertEntity> {
    const expert = await this.expertRepository.selectCompleteAsync(id);
    if (!expert) throw new DefaultError('Expert not found');
    return expert;
  }
}
