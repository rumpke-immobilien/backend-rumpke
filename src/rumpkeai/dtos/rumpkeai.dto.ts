import { IsInt, IsOptional, IsString } from "class-validator";



export class RumpkeAIDto {

  @IsString()
  readonly prompt: string;
  @IsInt()
  @IsOptional()
  readonly maxTokens: number;
}
