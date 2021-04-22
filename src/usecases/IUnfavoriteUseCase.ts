export interface IUnfavoriteUseCase {
  execute(userId: string, expertId: string): Promise<boolean>;
}
