import { FlatList, NativeBaseProvider } from "native-base";
import theme from "../theme";
import Main from "../components/Main";
import ExpenseItem, { ExpenseItemProps } from "../components/ExpenseItem";

const data: ExpenseItemProps[] = [
    {title: "Plus extra", price: 299, subTitle: "3 meses"},
    {title: "Render", price: 199, subTitle: "Extra"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
]

export default function MainPage(){
    return(
        <Main title="Expenses" >
            <FlatList data={data} maxH="72" renderItem={({item})=> <ExpenseItem title={item.title} subTitle={item.subTitle} price={item.price} />} />
        </Main>
    )
}