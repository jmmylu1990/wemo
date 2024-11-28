import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DataSource } from 'typeorm';
import { catchError, finalize } from 'rxjs/operators';

//待修正
@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const request = context.switchToHttp().getRequest();
    request.queryRunner = queryRunner;

    return next.handle().pipe(
      catchError(async (err) => {
        await queryRunner.rollbackTransaction();
        throw err;
      }),
      finalize(async () => {
        try {
          if (queryRunner.isTransactionActive) {
            await queryRunner.commitTransaction();
          }
        } catch (err) {
          await queryRunner.rollbackTransaction();
        } finally {
          console.log('释放 QueryRunner');
          await queryRunner.release();
        }
      }),
    );
  }
}
