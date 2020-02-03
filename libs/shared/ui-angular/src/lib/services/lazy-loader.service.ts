import {
  Compiler,
  Injectable,
  Injector,
  NgModule,
  NgModuleFactory,
  NgModuleRef,
  Type,
} from '@angular/core';

@Injectable()
export class LazyLoaderService {
  constructor(private compiler: Compiler, private injector: Injector) {}

  loadModule(path: any) {
    (path() as Promise<NgModuleFactory<any> | Type<any>>)
      .then((elementModuleOrFactory: NgModuleFactory<any> | Type<any>) => {
        if (elementModuleOrFactory instanceof NgModuleFactory) {
          // Compiler is ViewEngine (<= v8)
          return elementModuleOrFactory;
        } else {
          try {
            // Compiler is Ivy (>= v9)
            return this.compiler.compileModuleAsync(elementModuleOrFactory);
          } catch (err) {
            throw err;
          }
        }
      })
      .then((moduleFactory: NgModuleFactory<NgModule>) => {
        try {
          const moduleRef: NgModuleRef<NgModule> = moduleFactory.create(this.injector);
          const moduleInstance: NgModule = moduleRef.instance;
          console.log('Lazy-loaded module:', moduleInstance);
        } catch (err) {
          throw err;
        }
      });
  }
}
