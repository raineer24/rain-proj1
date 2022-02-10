import { AuthEffects, UserEffects, PostEffects } from "./effects/";
import { HttpErrorsEffects } from "./effects/http-errors.effects";

export const AppEffects = [UserEffects, AuthEffects, HttpErrorsEffects];
