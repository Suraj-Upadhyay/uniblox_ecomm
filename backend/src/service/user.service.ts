import { DB, DataTypes } from "../db";
import { UserType } from "../db/types";
import { CartService } from "./cart.service";

export class UserService {
  private static readonly db = DB.Instance;

  public static CreateUser(userData: DataTypes.UserType) {
    const newUserId = this.db.User.insert(userData);
    CartService.createCartForUser(newUserId);
    return newUserId;
  }

  public static getUserById(userId: number) {
    return this.db.User.findById(userId);
  }

  public static getUserByUsername(username: string) {
    return this.db.User.where({ username: username });
  }

  public static CheckUserPassword(
    user: UserType,
    passwordToCheck: string
  ): boolean {
    return passwordToCheck === user.password;
  }
}
