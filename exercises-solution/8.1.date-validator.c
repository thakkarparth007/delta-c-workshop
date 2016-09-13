#include "stdio.h"
void main()
{
	int d,m,y;
	printf("Enter date: ");
	scanf("%d-%d-%d",&d,&m,&y);
	if(y<0)
		{
			printf("It is not a valid date.");
			return;
		}
	if(m==1||m==3||m==5||m==7||m==8||m==10||m==12)
	{
		if(d>31||d<=0)
		{
			printf("It is not a valid date.");
			return;
		}
	}
	else if(m==2)
	{
		if(d>29||d<=0)
		{
			printf("It is not a valid date.");
			return;
		}
		else if(d==29)
		{
		if(y%4!=0)
		{
			printf("It is not a valid date.");
			return;	
		}	
		if((y%100==0)&&(y%400!=0))
		{
			printf("It is not a valid date.");
			return;
		}
	}
	}
	else
	{
		if(d>31||d<=0)
		{
			printf("It is not a valid date.");
			return;
		}
	}
		printf("It is a valid date.");
}