

import { IsString, IsOptional, IsEnum } from 'class-validator';

import { ValidateIf } from 'class-validator';

export class CreateTipFormDto {
  @IsString()
  tippgeberName: string;

  @IsString()
  tippgeberKontakt: string;

  @IsString()
  tippgeberAdresse: string;


  @ValidateIf(o => !o.stadt)
  @IsString()
  plz: string;

  @ValidateIf(o => !o.plz)
  @IsString()
  stadt: string;

  @IsString()
  beziehungEigentuemer: string;

  @IsString()
  immobilienAdresse: string;

  @IsOptional()
  @IsString()
  eigentuemerName?: string;

  @IsOptional()
  @IsString()
  eigentuemerKontakt?: string;

  @IsString()
  captchaToken: string;

  @IsEnum(["Urlaub", "E-Bike", "Gutschein", "Küche"])
  praemie: "Urlaub" | "E-Bike" | "Gutschein" | "Küche";
}
