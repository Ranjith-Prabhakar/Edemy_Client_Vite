import ThemeToggler from '../utils/ThemeToggler'

type Props = {}

const AdminNavbar = (props: Props) => {
  return (
    <div className='px-7 pt-7 w-screen '>
      <ThemeToggler/>
    </div>
  )
}

export default AdminNavbar