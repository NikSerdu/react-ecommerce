import { instanceUploadFiles } from '../api/api.interceptor'
import { IFile } from '../types/file.interface'

export const FileService = {
	async upload(data: FormData) {
		const response = await instanceUploadFiles<IFile[]>({
			url: `files`,
			method: 'POST',
			data,
			params: {
				folder: 'products'
			}
		})
		return response
	}
}
