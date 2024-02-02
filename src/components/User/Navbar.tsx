import ThemeToggler from '../utils/ThemeToggler'

type Props = {}

const UserNavbar = (props: Props) => {
  return (
    <div className='px-7 pt-7 w-screen '>
      <ThemeToggler/>
    </div>
  )
}

export default UserNavbar;