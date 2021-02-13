import { HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"

export class GetCatsIscatQuery {
  @ApiProperty({ name: "cat", required: true, description: `name of cat` })
  cat: string
}

export class GetCatsIscatResponse {
  @ApiProperty({ name: "result", description: "boolean value if query.cat is a cat." })
  result: boolean
  @ApiProperty({ name: "message", description: "response message" })
  message: string
  @ApiProperty({ name: "statusCode", description: "http status code" })
  statusCode: HttpStatus
}