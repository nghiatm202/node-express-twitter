import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'
import { ParamsDictionary } from 'express-serve-static-core'

export interface UpdateMeReqBody {
  name?: string
  date_of_birth?: string
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}

export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface GetProfileReqParams {
  username: string
}

export interface LogoutReqBody {
  refresh_token: string
}

export interface ForgotPasswordReqBody {
  email: string
}

export interface ResetPasswordReqBody {
  password: string
  confirm_password: string
  forgot_password_token: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
}

export interface FollowReqBody {
  followed_user_id: string
}

export interface UnfollowReqParams extends ParamsDictionary {
  user_id: string
}
