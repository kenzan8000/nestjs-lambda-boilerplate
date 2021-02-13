import { ApiProperty } from "@nestjs/swagger"

class RatelimitConfig {
  @ApiProperty({ name: "keyPrefix", description: `identifier of the endpoint.` })
  keyPrefix: string
  @ApiProperty({ name: "points", description: `maximum number how many times you are allowed to request in the period of time.` })
  points: number
  @ApiProperty({ name: "duration", description: `period of time in seconds.` })
  duration: number
  @ApiProperty({ name: "blockDuration", description: `period of time you will be banned until the block is over.` })
  blockDuration: number
  @ApiProperty({ name: "errorMessage", description: `error message` })
  errorMessage: string
  
  constructor(keyPrefix: string, points: number, duration: number, blockDuration: number) {
    this.keyPrefix = keyPrefix
    this.points = points
    this.duration = duration
    this.blockDuration = blockDuration
    this.errorMessage = `Rate limit exceeded. Cannot request more than ${points} times per ${duration} seconds.`
  }
}

export class RatelimitConfig5ReqsPer60Secs extends RatelimitConfig {
  constructor(keyPrefix: string) {
    super(keyPrefix, 5, 60, 3600)
  }
}

export class RatelimitConfig10ReqsPer60Secs extends RatelimitConfig {
  constructor(keyPrefix: string) {
    super(keyPrefix, 10, 60, 3600)
  }
}

export class RatelimitConfig30ReqsPer60Secs extends RatelimitConfig {
  constructor(keyPrefix: string) {
    super(keyPrefix, 30, 60, 3600)
  }
}