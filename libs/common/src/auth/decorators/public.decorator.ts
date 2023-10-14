import { SetMetadata } from "@nestjs/common"

const PUBLIC_DECORATOR_METADATA_KEY = "IS_PUBLIC"

export const Public = SetMetadata<string, boolean>(PUBLIC_DECORATOR_METADATA_KEY, true)
