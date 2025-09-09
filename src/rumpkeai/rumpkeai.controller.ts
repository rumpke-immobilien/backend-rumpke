import { Body, Controller, Get, Post } from '@nestjs/common';
import { RumpkeaiService } from './rumpkeai.service';
import { RumpkeAIDto } from './dtos/rumpkeai.dto';
import { CreateTipFormDto } from './dtos/create-tip-form.dto';


@Controller('rumpkeai')
export class RumpkeaiController {
  constructor(private readonly rumpkeaiService: RumpkeaiService) { }


  @Post('assistant')
  rumpkeAIAssistant(
    @Body() rumpkeAIDto: RumpkeAIDto,
  ) {

    return this.rumpkeaiService.rumpkeAIAssistant(rumpkeAIDto);
  }



  @Post('tip-form')
  submitTipForm(
    @Body() createTipFormDto: CreateTipFormDto,
  ) {

    return this.rumpkeaiService.submitTipForm(createTipFormDto);
  }

  @Get('count')
  countTips() {
    return this.rumpkeaiService.countTips();
  }

}
