export interface PaginatedResult<T> {
  list: T;
  total: number;
  totalPage: number;
  currentPage: number;
  pageSize: number;
}

export type PaginateOptions = {
  currentPage?: number | string;
  pageSize?: number | string;
};

export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;

export const paginator = (
  defaultOptions: PaginateOptions,
): PaginateFunction => {
  return async (model, args: any = { where: undefined }, options) => {
    const page =
      Number(options?.currentPage || defaultOptions?.currentPage) || 1;
    const pageSize =
      Number(options?.pageSize || defaultOptions?.pageSize) || 10;

    const skip = page > 0 ? pageSize * (page - 1) : 0;
    const [total, data] = await Promise.all([
      model.count({ where: args.where }),
      model.findMany({
        ...args,
        orderBy: {
          createdAt: 'desc',
        },
        take: pageSize,
        skip,
      }),
    ]);
    const totalPage = Math.ceil(total / pageSize);

    return {
      list: data,
      total,
      totalPage,
      currentPage: page,
      pageSize,
    };
  };
};

export const paginate: PaginateFunction = paginator({ pageSize: 10 });
