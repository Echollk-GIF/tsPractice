import { useState, useEffect } from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { cleanObject, useDebounce } from "utils"
import { useHttp } from "utils/http"
import styled from "@emotion/styled"
import { useAsync } from "utils/use-async"
import { Project } from "./list"
import { Typography } from "antd"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"

export const ProjectListScreen = () => {
    //项目名和负责人id
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 200)
    //负责人列表
    // const [users, setUsers] = useState([])
    // const client = useHttp()
    // const { run, isLoading, error, data: list } = useAsync<Project[]>()
    const { isLoading, error, data: list } = useProjects(debouncedParam)
    const { data: users } = useUsers()

    //初始化users
    // useEffect(() => {
    //     client('users').then(setUsers)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    //项目名或负责人改变时获取列表数据
    // useEffect(() => {
    //     run(client('projects', { data: cleanObject(debouncedParam) }))
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [debouncedParam])
    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel users={users || []} param={param} setParam={setParam} />
            {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
            <List loading={isLoading} users={users || []} dataSource={list || []} />
        </Container>
    )
}

const Container = styled.div`
    padding:3.2rem
`