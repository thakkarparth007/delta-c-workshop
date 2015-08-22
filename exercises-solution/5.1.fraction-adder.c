#include<stdio.h>
void main()
{
	int nr1,nr2,dr1,dr2;
	printf("Numerator of fraction 1: ");
	scanf("%d",&nr1);
	printf("Denominator of fraction 1: ");
	scanf("%d",&dr1);
	printf("Numerator of fraction 2: ");
	scanf("%d",&nr2);
	printf("Denominator of fraction 2: ");
	scanf("%d",&dr2);
	printf("%d/%d + %d/%d = %d/%d",nr1,dr1,nr2,dr2,nr1*dr2+nr2*dr1,dr1*dr2);
}