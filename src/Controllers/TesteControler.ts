import { Request, Response, Express } from 'express';

export const Teste = async (req: Request, res: Response) => {
    let { id } = req.body;
    const files = req.files;

    console.log(files);
    console.log(id);

    res.json({id});
}