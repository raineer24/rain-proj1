import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
