/* main.c */
/* 0 copyright/licensing */
/* 1 includes */
#include "main.h"
/* 2 defines */
/* 3 external declarations */
/* 4 typedefs */
/* 5 global variable declarations */
/* 6 function prototypes */

int main(int agrc, char* argv[]) {
    /* 7 command-line parsing */

    int child_pid = fork();
    if (child_pid == -1) {
        //error handling
        printf("error");
        return -1;
    }
    else if (child_pid != 0) {
        //parent process
        // printf("parent");
    }
    else {
        //child process
        printf("child");
    }
    return 0;
}

/* 8 function declarations */