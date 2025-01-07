export interface PostType {
  id: string;
  authorID?: string;
  content: string;
  imageUrl: string;
  title: string;
  createdAt?: Date;
}