import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserOtp } from '../entity/otp.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserOtp)
    private readonly otpRepository: Repository<UserOtp>,
  ) {}

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  create(data: Partial<User>): User {
    return this.userRepository.create(data);
  }

  save(data: Partial<User>) {
    return this.userRepository.save(data);
  }

  async createOtp(email: string, otp: string) {
    await this.otpRepository.delete({ email });

    const record = this.otpRepository.create({
      email,
      otp,
      is_used: false,
    });

    return this.otpRepository.save(record);
  }

  async findLatestOtp(email: string) {
    return this.otpRepository.findOne({
      where: {
        email,
        is_used: false,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async markUsed(id: string) {
    await this.otpRepository.update({ id }, { is_used: true });
  }
}
