import { BookmarkSquareIcon, UserIcon,  KeyIcon} from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { classNames } from '../utils'

//pages or view of menu
const tabs = [
    { name: 'Links', href: '/admin', icon: BookmarkSquareIcon },
    { name: 'My Profile', href: '/admin/profile', icon: UserIcon },
    { name: 'Password', href:'/admin/change-password',icon:KeyIcon}
]

//the function join class separate for space white
//return the text with the join class
// function classNames(...classes: string[]) {
//     return classes.filter(Boolean).join(' ')
// }

export default function NavigationTabs() {
    const location = useLocation()
    const navigate = useNavigate()

    //function for change the page or view
    //this function will execute when the user saw the web on her mobile
    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
       navigate(e.target.value);
    }

    return (
        <div className='mb-5'>
            {/* MOBILE */}
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    onChange={ handleChange }
                >
                    {tabs.map((tab) => (
                        <option 
                            value={tab.href}
                            key={tab.name}
                        >{tab.name}</option>
                    ))}
                </select>
            </div>

            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                to={tab.href}
                                className={classNames(
                                    location.pathname === tab.href
                                        ? 'border-blue-500 text-blue-500'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'group inline-flex items-center border-b-2 py-4 px-1 text-xl'
                                )}
                            >
                                <tab.icon
                                    className={classNames(
                                        location.pathname === tab.href ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
                                        '-ml-0.5 mr-2 h-5 w-5'
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}