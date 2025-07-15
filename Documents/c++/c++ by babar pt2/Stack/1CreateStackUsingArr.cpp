//27-05-2024
#include<iostream>
using namespace std;

class Stack
{
    public:
    int top;
    int *arr;
    int size;

    Stack(int size)
    {
        this->size = size;
        top = -1;
        arr = new int[size];
    }

    void push(int element)
    {
        if(top>=size-1)
        {
            cout<<"Stack Overflow , can't insert more element \n";
        }
        else
        {
            top++;
            arr[top]=element;
        }

    }
    void pop()
    {
        if(top>=0)
        {
            cout<<arr[top]<<" is popped \n";
            top--;
        }
        else
        {
            cout<<"Stack is empty \n";
        }
    }
    int peek()
    {
        if(top>-1)
        {
            return arr[top];
        }
        else
        {
            cout<<"Stack is empty \n";
            return -1;
        }
    }
    bool isEmpty()
    {
        if(top==-1)
        return true;
        else
        return false;
    }
};
int main()
{
    Stack s(5);
    s.push(1);
    s.push(2);
    s.push(3);
    s.push(4);
    s.push(5);
    s.push(6);
    s.push(5);

    cout<<s.peek()<<endl;
    s.pop();
    cout<<s.peek()<<endl;
    s.pop();
    s.pop();
    s.pop();
    cout<<s.isEmpty()<<endl;
    s.pop();
    s.peek();
    cout<<s.isEmpty();

    
}