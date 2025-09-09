

import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateTipFormDto {
  @IsString()
  name: string;

  @IsString()
  contact: string;

  @IsString()
  address: string;

  @IsString()
  ownerRelation: string;

  @IsString()
  propertyAddress: string;

  @IsOptional()
  @IsString()
  ownerName?: string;

  @IsOptional()
  @IsString()
  ownerContact?: string;

  @IsEnum(["Urlaub", "E-Bike", "Gutschein", "Küche"])
  prize: "Urlaub" | "E-Bike" | "Gutschein" | "Küche";
}
