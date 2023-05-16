import { Flex, Text, Circle } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontAwesome5 } from '@expo/vector-icons';

interface BillingTypeItemProps{
    icon: string;
    type: string;
    navigate?: string;
}

export default function BillingTypeItem({icon, type, navigate}: BillingTypeItemProps){
    return(
      <Flex>
        <Circle size="3rem" bg="white" mb="2" >
          <FontAwesome5 name={icon} size={20} color="#162237" />
        </Circle>
        <Text color="blueGray.700" >{type}</Text>
      </Flex>
    )
  }