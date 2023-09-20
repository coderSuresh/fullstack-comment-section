export type ChildrenProps = {
    children: React.ReactNode;
};

export type CommentProps = {
    _id?: string,
    comment?: string,
    author?: string,
    createdAt?: Date,
    loading?: boolean,
};