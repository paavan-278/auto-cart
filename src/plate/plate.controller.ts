import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PlateService } from './plate.service';
import { PlateResponseDto } from './dto/plate-response.dto';
import { PlateUploadDto } from './dto/plate-upload.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Plate Detection')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('plate')
export class PlateController {
  constructor(private readonly plateService: PlateService) {}

  @Post('detect')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: PlateUploadDto }) 
  @ApiResponse({ type: PlateResponseDto })
  @UseInterceptors(FileInterceptor('image'))
  detectPlate(@UploadedFile() file: Express.Multer.File) {
    return this.plateService.detectPlate(file);
  }
}
