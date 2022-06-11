interface Document {
    _id: string,
    created_at: string,
    updated_at: string,
}

export interface Image {
    file: string,
    title: string,
    author: string,
    userID: string,
}

export interface ImageModel extends Document, Image {}

export type ImageState = {
    data: Array<ImageModel>,
    loading: boolean,
    data_loaded: boolean,
};
