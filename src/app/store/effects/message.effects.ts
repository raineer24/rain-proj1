import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { ErrorMessage, MessageActionTypes } from "../actions/message.actions";
import { Action, Store } from "@ngrx/store";
import { MatSnackBar } from "@angular/material/snack-bar";
import { tap } from "rxjs/operators";

@Injectable()
export class MessageEffects {}
