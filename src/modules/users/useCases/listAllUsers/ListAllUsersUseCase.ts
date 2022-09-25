import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const users = this.usersRepository.list();

    const isAuthorizedUser = users.find(
      (user) => user.id === user_id && user.admin
    );

    if (!isAuthorizedUser) {
      throw new Error("Unauthorized");
    }

    return users;
  }
}

export { ListAllUsersUseCase };
