import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModal: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const createUser = await this.userModal.create(createUserDto);
    return createUser;
  }

  async findAll() {
    const users = await this.userModal.find().exec();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModal.findById(id).exec();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userModal
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    return updateUser;
  }

  async remove(id: string) {
    return await this.userModal.findByIdAndDelete(id).exec();
  }
}
