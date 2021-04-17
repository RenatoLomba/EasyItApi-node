export interface IExpertIsFavorited {
  execute(expertId: string, userId: string): Promise<boolean>;
}
