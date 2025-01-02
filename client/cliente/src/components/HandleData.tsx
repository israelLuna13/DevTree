import { socialNetwork, UserHanlde } from '../types'

type HandleDataProps ={
    data:UserHanlde
}
export default function HandleData({data}:HandleDataProps) {
    
    const links:socialNetwork[] = JSON.parse(data.links).
            filter((link:socialNetwork) => link.enabled)
    
  return (
   <>
     <div className='space-y-6 text-white'>
        <p className='text-5xl text-center font-black'> {data.handle}</p>
        {data.image && <img src={data.image} className='max-w-[250px] mx-auto' />}

        <p className='text-lg text-center font-bold'> {data.description}</p>

        <div className='mt-20 flex flex-col gap-6'>
            {links.length ? 
                //true\
                links.map(link => (
                    <a key={link.name}
                        className='bg-white px-5 py-2 flex items-center gap-5 rounded-lg' 
                        href={link.url}
                        target='_blank'
                        rel='noreferrer noopener'
                        > 
                        <img className='w-12' src={`/social/icon_${link.name}.svg`} alt="icon social network" />
                       <p className='text-black capitalize font-bold text-lg'> Follo me: {link.name}</p>
                    </a>
                ))
                :
                //false
                <p className='text-center'>There is not links</p>
                
                }

        </div>


     </div>
   
   </>
  )
}
