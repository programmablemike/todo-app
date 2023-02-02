// Typescript wrapper around the connect-rpc API for the app
import * as todov1 from 'todo-api/autogen/ts/todo/v1/todo_pb'
import { createConnectTransport, createPromiseClient } from '@bufbuild/connect-web'
import { TodoService } from 'todo-api/autogen/ts/todo/v1/todo_connectweb'
import { v4 as uuidv4 } from 'uuid'

export class TodoClient {
    private client
    constructor(private address: string) {
        const transport = createConnectTransport({
            baseUrl: address
        })
        this.client = createPromiseClient(TodoService, transport)

    }

    async CreateTask(id: string, name: string): Promise<todov1.CreateTaskResponse> {
        const req = new todov1.CreateTaskRequest()
        req.messageId = uuidv4()
        const res = await this.client.createTask(req)
        // TODO(mlee): Handle errors
        return res
    }

    async DeleteTask(id: string): Promise<todov1.DeleteTaskResponse> {
        const req = new todov1.DeleteTaskRequest()
        req.messageId = uuidv4()
        req.taskId = id 
        const res = await this.client.deleteTask(req)
        // TODO(mlee): Handle errors
        return res
    }

    async ListTasks(): Promise<todov1.ListTasksResponse> {
        const req = new todov1.ListTasksRequest()
        req.messageId = uuidv4()
        const res = await this.client.listTasks(req)
        // TODO(mlee): Handle errors
        return res
    }

    async MarkTask(id: string): Promise<todov1.MarkTaskResponse> {
        const req = new todov1.MarkTaskRequest()
        req.messageId = uuidv4()
        const res = await this.client.markTask(req)
        // TODO(mlee): Handle errors
        return res
    }
}