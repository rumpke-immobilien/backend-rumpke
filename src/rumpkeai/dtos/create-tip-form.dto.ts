

import { IsString, IsOptional, IsEnum, IsEmail } from 'class-validator';

import { ValidateIf } from 'class-validator';

export class CreateTipFormDto {
  @IsString()
  immobilienAdresse: string;

  @IsOptional()
  @IsString()
  eigentuemerKontakt?: string;
  @IsString()
  tippgeberName: string;

  @IsEmail()
  tippgeberKontakt: string;

  @IsString()
  tippgeberAdresse: string;


  @IsString()
  plzOderStadt: string;

  @IsString()
  beziehungEigentuemer: string;
  eigentuemerName?: string;

  @IsString()
  captchaToken: string;

  @IsEnum(["Urlaub", "E-Bike", "Gutschein", "Küche"])
  praemie: "Urlaub" | "E-Bike" | "Gutschein" | "Küche";
}
