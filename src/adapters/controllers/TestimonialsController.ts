import { Request, Response } from 'express';
import { ICreateTestimonialUseCase } from '../../usecases/ICreateTestimonialUseCase';
import { TestimonialDTOResult } from '../dtos/testimonial/TestimonialDTOResult';
import { DefaultError } from '../errors/DefaultError';

export class TestimonialsController {
  constructor(
    private createTestimonialUseCase: ICreateTestimonialUseCase,
  ) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const {
      expertId, userId, description, stars,
    } = req.body;

    if (!expertId || !userId || !stars) throw new DefaultError('Campos necessários não informados');

    const testimonial = await this.createTestimonialUseCase.execute({
      expert_id: expertId, user_id: userId, description, stars,
    });

    const testimonialResult = new TestimonialDTOResult(testimonial);
    return res.status(201).json(testimonialResult);
  }
}
