import { DefaultError } from '../../adapters/errors/DefaultError';
import { TestimonialEntity } from '../../entities/TestimonialEntity';
import { IExpertRepository } from '../../repositories/IExpertRepository';
import { ITestimonialRepository } from '../../repositories/ITestimonialRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ICreateTestimonialDTO } from '../dtos/ICreateTestimonialDTO';
import { ICreateTestimonialUseCase } from '../ICreateTestimonialUseCase';

export class CreateTestimonialUseCase implements ICreateTestimonialUseCase {
  constructor(
    private testimonialRepository: ITestimonialRepository,
    private userRepository: IUserRepository,
    private expertRepository: IExpertRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(testimonial: ICreateTestimonialDTO): Promise<TestimonialEntity> {
    if (testimonial.stars > 5) throw new DefaultError('Avaliação não pode ser maior que 5');

    const user = await this.userRepository.selectByIdAsync(testimonial.user_id);
    if (!user) throw new DefaultError('User not found');

    const expert = await this.expertRepository.selectByIdAsync(testimonial.expert_id);
    if (!expert) throw new DefaultError('Expert not found');

    const alreadyTestimonied = await this.testimonialRepository
      .selectByExpertAndUser(expert.id, user.id);
    if (alreadyTestimonied) throw new DefaultError('Usuário já possui depoimento para este Expert');

    const newTestimonial = new TestimonialEntity(testimonial);
    const testimonialCreated = await this.testimonialRepository.insertAsync(newTestimonial);

    const testimonials = await this.testimonialRepository.selectByExpert(expert.id);
    if (testimonials.length === 0) throw new DefaultError('Testimonials not found');

    const count = testimonials.length;
    const totalScore = testimonials.reduce((prevTest, currTest) => prevTest + currTest.stars, 0);
    const expertScore = Number(totalScore / count);
    expert.stars = expertScore;

    await this.expertRepository.updateAsync(expert);
    return testimonialCreated;
  }
}
