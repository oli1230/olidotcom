#include "olidb.h"

napi_value execute_query(napi_env env, napi_callback_info info) {
  napi_status status;
  size_t argc = 1;
  int number = 0;
  napi_value argv[1];
  status = napi_get_cb_info(env, info, &argc, argv, NULL, NULL);

  if (status != napi_ok) {
    napi_throw_error(env, NULL, "Failed to parse arguments");
  }

  status = napi_get_value_int32(env, argv[0], &number);

  if (status != napi_ok) {
    napi_throw_error(env, NULL, "Invalid number was passed as argument");
  }
  napi_value myNumber;
  number = number * 2;
  status = napi_create_int32(env, number, &myNumber);

  if (status != napi_ok) {
    napi_throw_error(env, NULL, "Unable to create return value");
  }

  // FILE *fdopen(int fd, const char *mode);

  // FILE *popen(const char *command, const char *type);
  // int pclose(FILE *stream);

  // FILE *fp;
  // char *command;

  // /* command contains the command string (a character array) */

  // /* If you want to read output from command */
  // fp = popen(command,"r"); 
  //     /* read output from command */
  //       fscanf(fp,....);   /* or other STDIO input functions */
  
  // fclose(fp);

  // /* If you want to send input to command */
  // fp = popen(command,"w"); 
  //     /* write to command */
  //       fprintf(fp,....);   /* or other STDIO output functions */
  
  // fclose(fp);

  // char* command = "echo 'Hello!'";
  // int j = system("echo 'Hello!'");
  // printf("%d", j);

  // int child_pid = fork();
  // if (child_pid == 0) {
  //   // child process
  //   printf("wutup yall n shit");
  //   _exit(0);
  // }
  // else {
  //   kill(child_pid);
  // }

  char* command_name = "ls";
  char* args[] = {command_name, "-l", NULL};
  execvp(command_name, args);

  return myNumber;
}

napi_value Init(napi_env env, napi_value exports) {
  napi_status status;
  napi_value fn;

  status = napi_create_function(env, NULL, 0, execute_query, NULL, &fn);
  if (status != napi_ok) {
    napi_throw_error(env, NULL, "Unable to wrap native function");
  }

  status = napi_set_named_property(env, exports, "execute_query", fn);
  if (status != napi_ok) {
    napi_throw_error(env, NULL, "Unable to populate exports");
  }

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)