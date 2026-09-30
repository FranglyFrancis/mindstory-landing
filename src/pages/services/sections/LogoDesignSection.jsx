import IconList from '../blocks/IconList';
import { lists } from '../../../data/services/LogoDesign'; 

export default function LogoDesignSection(){
    return(
        <section>
            {lists.map((list)=>(
                <IconList key={list.id} title={list.title} description={list.description} />
            ))}
        </section>

    )
}