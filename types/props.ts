export type ChildrenProps = {
    children: React.ReactNode;
};

export type CommentProps = {
    _id?: string,
    comment?: string,
    commentID?: string,
    author?: string,
    createdAt?: Date,
    loading?: boolean,
    replies?: [],
    score?: number,
    replyTo?: string,
};