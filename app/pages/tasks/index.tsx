import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTasks from "app/tasks/queries/getTasks"

const ITEMS_PER_PAGE = 100

export const TasksList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ tasks, hasMore }] = usePaginatedQuery(getTasks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link href={`/tasks/${task.id}`}>
              <a>{task.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TasksPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Tasks</title>
      </Head>

      <div>
        <p>
          <Link href="/tasks/new">
            <a>Create Task</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TasksList />
        </Suspense>
      </div>
    </>
  )
}

TasksPage.authenticate = true
TasksPage.getLayout = (page) => <Layout>{page}</Layout>

export default TasksPage
