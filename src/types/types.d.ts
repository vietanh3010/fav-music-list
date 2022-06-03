
declare interface TableDataSource {
    name: string,
    created_at: Date,
}
declare type SortType = keyof TableDataSource;
declare type SortState = {
    [k in SortType]: boolean
}

declare type LangType = 'en' | 'vn' | 'pl';