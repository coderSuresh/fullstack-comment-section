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

export type ReplyProps = {
    _id?: string,
    author?: string,
    addReplyToComment: (commentId: string, newReply: CommentProps) => void,
};