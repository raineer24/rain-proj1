import { AuthEffects } from "./effects/auth.effects";
import { HttpErrorsEffects } from "./effects/http-errors.effects";

export const AppEffects = [AuthEffects, HttpErrorsEffects];
